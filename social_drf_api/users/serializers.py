from rest_framework import serializers
from .models import User, Profile
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Optional: add extra info to token payload
        token['email'] = user.email
        return token

    def validate(self, attrs):
        # Let JWT accept 'email' instead of 'username'
        attrs['username'] = attrs.get('email')
        return super().validate(attrs)


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "email", "password", "confirm_password"]

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop(
            "confirm_password"
        )  # remove confirm_password before creating user
        user = User.objects.create_user(
            email=validated_data["email"], password=validated_data["password"]
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "followers_count", "following_count"]
    
    def get_followers_count(self, obj):
        return obj.profile.followers.count()
    
    def get_following_count(self, obj):
        return obj.profile.following.count()


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = [
            "user",
            "bio",
            "location",
            "birth_date",
            "profile_image",
            "followers",
            "date_joined",
            "date_updated",
        ]
        read_only_fields = ["user", "date_joined", "date_updated"]
