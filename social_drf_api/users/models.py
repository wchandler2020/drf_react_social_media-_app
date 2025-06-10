from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)
    
class User(AbstractUser):
    objects = UserManager()
    username = None
    email = models.EmailField(unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'  # 'email' since I am using email-based login
    REQUIRED_FIELDS = []  # optional depending on setup

    def __str__(self):
        return self.email
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)
    followers = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='following')
    date_joined = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Profile of {self.user.email}'