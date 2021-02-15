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
}

const schema = yup.object().shape({
  email: yup.string().trim().email().required("Email is required."),
  password: yup.string().trim().required("Password is required."),
});

const Login: React.FC = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [, dispatch] = useStore();

  const setAutoLogout = (milliseconds: number) => {
    setTimeout(() => {
      dispatch("LOGOUT");
    }, milliseconds);
  };

  const onSubmit = async (data: IFormInputs) => {
    try {
      const result = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (result.status === 422) {
        throw new Error("Validation failed.");
      }
      if (result.status !== 200) {
        throw new Error("Could not authenticate you!");
      }

      const resultData = await result.json();
      dispatch("LOGIN", resultData.token);

      const remainingMilliseconds = 15 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

      localStorage.setItem("expiryDate", expiryDate.toISOString());
      localStorage.setItem("token", resultData.token);
      localStorage.setItem("userId", resultData.userId);

      setAutoLogout(remainingMilliseconds);
      Router.push("/dashboard");
    } catch (err) {
      dispatch("LOGOUT");
    }
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

export default Login;
