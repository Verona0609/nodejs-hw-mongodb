import dotenv from "dotenv";

//mongodb+srv://dikayanika15:6875Aimns=+@cluster0.5qit7.mongodb.net/students?retryWrites=true&w=majority&appName=Cluster0

dotenv.config();

export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}

//  Використати її ми можемо, наприклад, в такому вигляді: env('PORT', '3000');
//  Якщо змінної оточення з такою назвою не було вказано і не було передано дефолтного значення,
// то виклик цієї функції викине помилку з повідомленням Missing: process.env['PORT'].
