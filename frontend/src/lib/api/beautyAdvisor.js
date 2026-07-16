import { api } from './client';

export const beautyAdvisorApi = {
    startConversation: (guestSessionId = null) => {
        const headers = guestSessionId ? { 'X-Guest-Session-Id': guestSessionId } : {};
        return api.post('/beauty-advisor/conversations', { guest_session_id: guestSessionId }, { headers });
    },

    getConversation: (id, guestSessionId = null) => {
        const headers = guestSessionId ? { 'X-Guest-Session-Id': guestSessionId } : {};
        return api.get(`/beauty-advisor/conversations/${id}`, { headers });
    },

    newConversation: (id, guestSessionId = null) => {
        const headers = guestSessionId ? { 'X-Guest-Session-Id': guestSessionId } : {};
        return api.post(`/beauty-advisor/conversations/${id}/new`, {}, { headers });
    },

    clearConversation: (id, guestSessionId = null) => {
        const headers = guestSessionId ? { 'X-Guest-Session-Id': guestSessionId } : {};
        return api.delete(`/beauty-advisor/conversations/${id}/messages`, { headers });
    },

    sendMessage: (id, message, guestSessionId = null) => {
        const headers = guestSessionId ? { 'X-Guest-Session-Id': guestSessionId } : {};
        return api.post(`/beauty-advisor/conversations/${id}/messages`, { message }, { headers });
    },

    updateProfile: (id, profileContext, guestSessionId = null) => {
        const headers = guestSessionId ? { 'X-Guest-Session-Id': guestSessionId } : {};
        return api.post(`/beauty-advisor/conversations/${id}/profile`, { profile_context: profileContext }, { headers });
    },

    savePlan: (title, profileContext, routineData, conversationId = null) => {
        return api.post('/beauty-advisor/plans', {
            title,
            profile_context: profileContext,
            routine_data: routineData,
            conversation_id: conversationId
        });
    },

    getPlans: () => {
        return api.get('/beauty-advisor/plans');
    }
};
