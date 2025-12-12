export interface User {
  username: string;
  password?: string;
}

export function saveUser(user: User) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

export function findUser(username: string): User | undefined {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find(u => u.username === username);
}

export function setCurrentUser(user: User) {
  localStorage.setItem('currentUser', JSON.stringify({ username: user.username }));
}

export function getCurrentUser(): { username: string } | null {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem('currentUser');
}
