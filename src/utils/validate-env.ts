import { cleanEnv } from "envalid";
import { bool, port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    // Server Environment
    NODE_ENV: str(),

    // API Port
    PORT: port(),

    // Database Configuration
    MYSQL_HOST: str(),
    MYSQL_USER: str(),
    MYSQL_PASSWORD: str(),
    MYSQL_PORT: port(),

    // SMTP Configuration
    SMTP_SERVICE: str(),
    SMTP_HOST: str(),
    SMTP_PORT: port(),
    SMTP_SECURE: bool(),
    SMTP_EMAIL: str(),
    SMTP_PASSWORD: str(),

    ADMIN_EMAIL: str()

});