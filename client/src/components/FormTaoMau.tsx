import { Form, AutoComplete, Input, Button } from "antd";
import React from "react"
import { FormInstance } from 'antd/lib/form';
import { useQuery, useMutation, gql, ApolloConsumer } from "@apollo/client";

const EXCHANGE_RATES = gql`
mutation  {
        hello
      }
`;

const formRef = React.createRef<FormInstance>();



const FormTaoMau = ({ onFinish }: any) => {
    // const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    //     pollInterval: 0
    // });
    // if (loading) return <p>Loading ...</p>;
	// return (
	// 	<Form ref={formRef} onFinish={(values: any) => onFinish(values)}>
	// 		<Form.Item label='Loại công trình' name='loaiCongTrinh'>
	// 			<AutoComplete />
	// 		</Form.Item>
	// 		<Form.Item label='Tên bộ phận' name='tenBoPhan' >
	// 			<Input />
	// 		</Form.Item>
	// 		<Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
	// 			<Button type="primary" htmlType="submit">
	// 				Lưu
	// 		</Button>
	// 		</Form.Item>
	// 	</Form>
    // )
    let input: any;
  const [addTodo, { data }] = useMutation(EXCHANGE_RATES);
    console.log(data);
    
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default FormTaoMau;