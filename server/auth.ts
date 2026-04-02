import { nanoid } from "nanoid";

const VALID_USERNAME = "bessacalendario";
const VALID_PASSWORD = "Bessa@0911";

// Simples armazenamento em memória de sessões (em produção, use banco de dados)
const sessions = new Map<string, { username: string; createdAt: Date }>();

export function authenticateUser(username: string, password: string) {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    const token = nanoid(32);
    sessions.set(token, {
      username,
      createdAt: new Date(),
    });

    return {
      success: true,
      token,
      user: {
        username,
        role: "admin",
      },
    };
  }

  return {
    success: false,
    error: "Usuário ou senha incorretos",
  };
}

export function verifyToken(token: string) {
  const session = sessions.get(token);
  if (!session) {
    return null;
  }

  // Verificar se a sessão expirou (24 horas)
  const now = new Date();
  const diff = now.getTime() - session.createdAt.getTime();
  const hours = diff / (1000 * 60 * 60);

  if (hours > 24) {
    sessions.delete(token);
    return null;
  }

  return session;
}

export function logout(token: string) {
  sessions.delete(token);
}
