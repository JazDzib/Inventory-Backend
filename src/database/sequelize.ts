import { Sequelize } from "sequelize";
import "dotenv/config";


function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing env var: ${name}`);
    }
    return value;
}

export const sequelize = new Sequelize({
    host: requireEnv("DB_HOST"),
    port:Number(process.env.DB_PORT) || 3306,
    username: requireEnv("DB_USER"),
    password: requireEnv("DB_PASSWORD"),
    database: requireEnv("DB_NAME"),
    dialect: "mysql",
    logging: false, 
});

export async function initDb(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL exitosa");

    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas correctamente");
    
  } catch (error) {
    console.error("Error al conectar a MySQL:", (error as Error).message);
    throw error;
  }
}

