import Page from "./page.ts";

class CheckoutSelfServePage extends Page {
    constructor() {
        super();
    }

    get formFields() {
        return $$('input[data-cy="input-text"]')
    }

    public async checkSocialLogin (socialPlat: string) {
        //getter methods do not allow params, this is why this selector is in a method
        const sel = `//span[@data-cy='button-label' and contains(.,'${socialPlat}')]`
        return await $(sel).getText()
    }

}

export default new CheckoutSelfServePage()
