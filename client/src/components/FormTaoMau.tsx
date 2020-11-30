import { Form, AutoComplete, Input, Button } from "antd";
import React from "react"
import { FormInstance } from 'antd/lib/form';
import { useQuery, useMutation, gql, ApolloConsumer } from "@apollo/client";
import { ws } from "../api/nvExcel";

const EXCHANGE_RATES = gql`
query  {
        hello
      }
`;

const formRef = React.createRef<FormInstance>();

const _getValues = async () => {
  console.log('ds');
  await ws?.getActive();
  const lastRow = await ws.getLastRow();
  const val = await ws?.getFomulas(`A7:J${lastRow.cell1.row}`);
  return JSON.stringify(val);
}


const FormTaoMau = ({ onFinish }: any) => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    pollInterval: 0
  });
  if (loading) return <p>Loading ...</p>;
  return (
    <Form ref={formRef} onFinish={async (values: any) => {
      console.log(values);
      
      const res = await _getValues()
    }}>
      <Form.Item label='Loại công trình' name='loaiCongTrinh'>
        <AutoComplete />
      </Form.Item>
      <Form.Item label='Tên bộ phận' name='tenBoPhan' >
        <Input />
      </Form.Item>
      <Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
        <Button type="primary" htmlType="submit">
          Lưu
  		</Button>
      </Form.Item>
    </Form>
  );
}

export default FormTaoMau;