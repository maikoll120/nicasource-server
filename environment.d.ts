declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
    DB_PORT: number
    SALT_ROUNDS: number
    SECRET: string
    TOKEN_EXPIRE: number
  }
}
