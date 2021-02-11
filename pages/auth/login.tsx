import {
  Page,
  Layout,
  Card,
  TextStyle,
  TextField,
  Caption,
  FormLayout,
  Button,
  Form,
} from "@shopify/polaris";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Head from "next/head";

import GeneralLayout from "../../components/layout-general";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().required(),
});

const login = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    alert(data.email + " " + data.password);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <GeneralLayout>
        <Page fullWidth title="Login">
          <Layout>
            <Layout.Section oneHalf>
              <Card title="User login" sectioned>
                <Card.Section>
                  <TextStyle variation="subdued">
                    Enter your data please
                  </TextStyle>
                </Card.Section>
                <Card.Section>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormLayout>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ onChange, value }) => (
                          <TextField
                            type="email"
                            label="Email"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <Caption>{errors.email?.message}</Caption>

                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ onChange, value }) => (
                          <TextField
                            type="password"
                            label="Password"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <Caption>{errors.password?.message}</Caption>

                      <Button submit>Submit</Button>
                    </FormLayout>
                  </Form>
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </GeneralLayout>
    </>
  );
};

export default login;
