import puppeteer from "puppeteer";

export abstract class Base {
    abstract buttonSelector(): string;

    async execute(url: string, id: string, password: string) {
        let page = await this.login(url, id, password);
        if (await page.$(this.buttonSelector()) == null) {
            console.log("Already done?");
            return;
        }
        await page.click('button[name="agree"]');
    }

    private async login(url: string, id: string, password: string): Promise<puppeteer.Page> {
        console.log(url);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.type("#y_logincd", id);
        await page.type("#password", password);
        await page.click("#id_passlogin");
        await page.screenshot({ path: "/tmp/a.png" });
        return page;
    }
}