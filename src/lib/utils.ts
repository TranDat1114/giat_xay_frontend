import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function isLoggedIn() {
  return getAccessToken() !== null;
}

export function isAdmin() {
  return getUserRole() === 'Admin';
}

export function getUserRole() {
  return sessionStorage.getItem('role');
}


