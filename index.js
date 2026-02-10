import { input, select } from "@inquirer/prompts";
import qr from "qr-image";
import fs from "fs";
import path from "path";
import pc from "picocolors";

const outputDir = path.dirname(process.execPath);

function getAvailablePath(baseName, extension) {
    let finalPath = path.join(outputDir, `${baseName}${extension}`);
    let counter = 2;
    while (fs.existsSync(finalPath)) {
        finalPath = path.join(outputDir, `${baseName}_${counter}${extension}`);
        counter++;
    }
    return finalPath;
}

async function startApp() {
    let running = true;

    while (running) {
        console.clear();
        console.log(pc.cyan("------- QR CODE GENERATOR -------"));
        console.log(pc.dim(`Output directory: ${outputDir}\n`));

        const url = await input({ message: "Please enter the URL:" });

        if (!url.trim()) continue;

        const qrPath = getAvailablePath("qr_image", ".png");
        const txtPath = path.join(outputDir, "INPUTS.txt");

        const qr_svg = qr.image(url, { type: 'png' });
        const stream = qr_svg.pipe(fs.createWriteStream(qrPath));

        await new Promise((resolve) => stream.on('finish', resolve));

        console.log(pc.green(`\n[SUCCESS] QR code saved: `) + pc.white(path.basename(qrPath)));
        
        // Mevcut dosyaya ekleme yap (yoksa oluşturur, varsa sona ekler)
        fs.appendFileSync(txtPath, url + "\n");
        console.log(pc.green(`[SUCCESS] URL appended to: `) + pc.white("INPUTS.txt"));

        console.log("");

        const action = await select({
            message: "What would you like to do?",
            choices: [
                { name: "1- Create a new QR code", value: "new" },
                { name: "2- Exit", value: "exit" }
            ]
        });

        if (action === "exit") {
            console.log(pc.yellow("Exiting..."));
            running = false;
            process.exit(0);
        }
    }
}

startApp().catch(err => {
    console.error(pc.red("\n[ERROR]"), err.message);
    process.exit(1);
});