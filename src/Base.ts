import puppeteer from "puppeteer";

export abstract class Base {
    abstract buttonLabel(): string;

    async execute(url: string, id: string, password: string) {
        let page = await this.login(url, id, password);
        let button = await this.findButton(page, this.buttonLabel());
        if (!button) {
            console.log("Already done?");
            return;
        }

        await button.click();
    }

    private async login(url: string, id: string, password: string): Promise<puppeteer.Page> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.type("#y_logincd", id);
        await page.type("#password", password);
        await page.click("#id_passlogin");
        await page.screenshot({ path: "/tmp/a.png" });
        return page;
    }

    private async findButton(page: puppeteer.Page, label: String): Promise<puppeteer.ElementHandle | null> {
        const buttons = await page.$$("button[name='_stampButton']");
        if (buttons.length <= 0) {
            return null;
        }
        for (let i = 0; i < buttons.length; i++) {
            if (label == await (await buttons[i].getProperty('textContent')).jsonValue()) {
                console.log("found");
                return buttons[i];
            };
        }
        return null;
    }
}