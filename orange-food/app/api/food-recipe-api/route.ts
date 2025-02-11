import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // JSON dosyasının yolu
    const filePath = path.join(process.cwd(), "public", "data", "recipes.json");

    // Dosya okuma işlemi
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    return NextResponse.json(jsonData);
  } catch (error: any) {
    console.error("Error reading recipes.json:", error);
    return NextResponse.json(
      { error: "Unable to load recipes data" },
      { status: 500 }
    );
  }
}
