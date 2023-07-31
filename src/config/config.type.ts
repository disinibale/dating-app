export interface AppConfig {
    database: {
        port: number
        host: string
        name: string
        schema: string
        username: string
        password: string
    }
    port: number;
    jwtSecret: string;
}

export type Environment = 'development' | 'production' | string