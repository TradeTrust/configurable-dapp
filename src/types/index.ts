import { FormProps } from "react-jsonschema-form";
type JsonSchema = FormProps<any>["schema"];

export type DocumentMeta = {
  name: string;
  $template: {
    name: string;
    type: string;
    url: string;
  };
  issuers: Array<{
    name: string;
    tokenRegistry: string;
    identityProof: {
      type: string;
      location: string;
    };
  }>;
};

export interface Config {
  application: {
    wallet: object;
    network: string;
  };
  documentMeta: DocumentMeta;
  formSchema: Array<JsonSchema>;
}
