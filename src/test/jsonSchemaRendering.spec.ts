import { Selector } from "testcafe";

fixture("Config JsonSchema Rendering").page`http://localhost:3010`; // eslint-disable-line mdx/no-unused-expressions

const Config = "./fixture/config.json";
const DropzoneContainer = Selector("#dropzone-container");
const FormHeader = Selector("#form-header");
const FormBody = Selector("#form-body");

const validateTextContent = async (t: TestController, component: Selector, texts: string[]): Promise<any> =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

/* eslint-disable jest/expect-expect, jest/require-top-level-describe */
test("config schema is rendered correctly", async () => {
  await new Promise(async (t: any) => {
    const container = Selector("#document-dropzone");
    await container();
    await validateTextContent(t, DropzoneContainer, ["Drag 'n' drop TradeTrust configuration file here"]);

    await t.setFilesToUpload("input[type=file]", [Config]);

    await FormHeader.with({ visibilityCheck: true })();

    await validateTextContent(t, FormBody, [
      "DEMO CNM",
      "Template Renderer",
      "Issuers of the document",
      "Port of Loading",
      "Recipient of the container",
      "Consignee"
    ]);
  });
});
