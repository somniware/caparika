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
import Router from "next/router";

import GeneralLayout from "../../components/layout-general";
import { useStore } from "../../hooks-store/store";

interface IFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  email: yup.string().trim().email().required("Email is required."),
  password: yup.string().trim().required("Password is required."),
  confirmPassword: yup
    .string()
    .trim()
    .test("passwords-match", "Passwords must match.", function (value) {
      return this.parent.password === value;
    }),
});

const Signup: React.FC = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [, dispatch] = useStore();

  const onSubmit = async (data: IFormInputs) => {
    try {
      const result = await fetch("/api/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (result.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (result.status !== 201) {
        throw new Error("Creating a user failed!");
      }

      await result.json();
      dispatch("LOGOUT");
      Router.push("/auth/login");
    } catch (err) {
      dispatch("LOGOUT");
    }
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <GeneralLayout>
        <Page fullWidth title="Signup">
          <Layout>
            <Layout.Section oneHalf>
              <Card title="User registration" sectioned>
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

                      <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        render={({ onChange, value }) => (
                          <TextField
                            type="password"
                            label="Confirm Password"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <Caption>{errors.password?.message}</Caption>

                      <Button submit fullWidth>
                        Submit
                      </Button>
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

export default Signup;
