 <div className="TabEntry">
                    <div className="btn" style={{
                        height: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Title level={3}>Add Tablet</Title>
                        {/* <Button type='dashed' size='large' icon={<PlusCircleOutlined />} onClick={()=>onTabSubmit()}>Add Tab</Button>
                        <Modal title='Add Tablet' centered open={modalOpen} onOk={()=>setModal(false)} onCancel={()=>{setModal(false)}}> 
                            <Form>

                            </Form>
                        </Modal> */}
                        <Popover
                            content={<DataEntry />}
                            title="Title"
                            trigger="click"
                            open={modalOpen}
                            onOpenChange={handleOpenChange}

                        >
                            <Button type="primary">Add Installation</Button>
                        </Popover>
                    </div>
                </div>

\*\*\*\* 10/01/2022

-->serial no. in tab page should be in search tag,
-->and table master only needed serial number in table field and it's show tab field search select tag
