import { Button, Empty } from "antd";
import React from "react";
const NoSheet = ({wsExits, onClick, mesenger}: any) => {
    return (
        <div hidden={wsExits} style={{ margin: 'auto' }}>
					<Empty
						style={{
							paddingTop: 60,
							paddingBottom: 60
						}}
						image="assets/empty.svg"
						imageStyle={{
							height: 60,
						}}
						description={
							<span>
								{mesenger}
										</span>
						}
					>
						<Button type="primary" onClick={() => onClick()}>Khởi tạo</Button>
					</Empty>
				</div>
    )
}
export default NoSheet