import { Selector } from "testcafe";

fixture("Schema Form Rendering").page`http://localhost:3010`; // eslint-disable-line mdx/no-unused-expressions

const Config = "./fixture/config.json";
const Data = "./fixture/formData.json";
const FormHeader = Selector("#form-header");
const ShowPreview = Selector("#document-preview");
const PreviewModal = Selector("#preview-modal");
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");

const validateTextContent = async (t: TestController, component: Selector, texts: string[]): Promise<any> =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

/* eslint-disable jest/expect-expect, jest/require-top-level-describe, jest/no-test-callback */
test("form preview is rendered correctly", async (t: TestController) => {
  await t.setFilesToUpload("input[type=file]", [Config]);
  await FormHeader.with({ visibilityCheck: true })();
  await t.setFilesToUpload("input[type=file]", [Data]);

  await validateTextContent(t, FormHeader, ["Show Preview"]);
  await t.click(ShowPreview).setPageLoadTimeout(10000);
  await validateTextContent(t, PreviewModal, ["Document Preview"]);
  await t.switchToIframe(IframeBlock);
  await SampleTemplate.with({ visibilityCheck: true })();

  await validateTextContent(t, SampleTemplate, [
    "Demo Shipper",
    "BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT",
    "Demo Consignee",
    "China Port",
    "Green Apples",
    "THREE/3"
  ]);
});
