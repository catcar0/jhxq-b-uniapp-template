import { defineStore } from "pinia";
import { LemToken } from "@/utils/auth";
import { ref } from "vue";

export const useAuthStore = defineStore('auth_b', () => {
	const Token = ref<string>(LemToken.get());

	return {
		Token
	}
})