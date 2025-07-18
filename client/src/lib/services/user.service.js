// user.service.js
import api from '../api.js';

export async function getUserById(userId) {
  try {
    const user = await api(`/users/${userId}`, "GET");
    console.log('getUserById successful:', user);
    return user;
  } catch (error) {
    console.error('getUserById failed:', error);
    throw error;
  }
}

export async function getTopByChallengeLikes() {
  try {
    const data = await api('/users/topUsersByChallengeLikes', 'GET');
    return data;
  } catch (error) {
    console.error('SERVICE getTopByChallengeLikes failed:', error);
    throw error;
  }
}

export async function getTopByParticipationLikes() {
  try {
    const data = await api('/users/topUsersByParticipationLikes', 'GET');
    return data;
  } catch (error) {
    console.error('SERVICE getTopByParticipationLikes failed:', error);
    throw error;
  }
}


export async function uploadAvatar(userId, imageFile) {
  try {
    const formData = new FormData();
    formData.append('avatar', imageFile); // 'avatar' doit correspondre au champ attendu côté backend
    console.log('SERVICE uploadAvatar formData: ', formData)
    const avatarUploaded = await api(`/users/${userId}/avatar`, "POST", formData)
    return avatarUploaded;
  } catch (error) {
    console.error('SERVICE Avatar upload failed: ', error);
    throw error;
  }
}