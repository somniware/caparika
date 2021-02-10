import {
  Page,
  Layout,
  Card,
  TextStyle,
  TextField,
  Caption,
  FormLayout,
  Button,
  Form
} from '@shopify/polaris';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import GeneralLayout from '../../components/layout-general';

interface IFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().required(),
  confirmPassword: yup.string().trim().required()
});

const Signup = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: IFormInputs) => {
    alert(data.email + ' ' + data.password + ' ' + data.confirmPassword);
  };

  return (
    <GeneralLayout>
      <Page
        fullWidth
        title="Signup"
      >
        <Layout>
          <Layout.Section oneHalf>
            <Card title="User registration" sectioned>
              <Card.Section>
                <TextStyle variation="subdued">Enter your data please</TextStyle>
              </Card.Section>
              <Card.Section>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormLayout>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => <TextField type="email" label="Email" onChange={onChange} value={value} />}
                    />
                    <Caption>{errors.email?.message}</Caption>

                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => <TextField type="password" label="Password" onChange={onChange} value={value} />}
                    />
                    <Caption>{errors.password?.message}</Caption>

                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => <TextField type="password" label="Confirm Password" onChange={onChange} value={value} />}
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
  );
}

export default Signup;