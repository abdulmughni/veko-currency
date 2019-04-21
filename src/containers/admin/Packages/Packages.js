import React, {Component} from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import PackagesActions from '../../../redux/packages/actions'
import EditPackageForm from './EditPackageForm';
import {connect} from "react-redux";
import {Table, Divider, Row, Pagination, Modal, message} from 'antd';
import PageHeader from "../../../components/utility/pageHeader";
import {Client} from '../../../settings/index';
import basicStyle from "../../../settings/basicStyle";
import Button from '../../../components/uielements/button';


const {findPackage, removePackage, updatelocal} = PackagesActions


export class Packages extends Component {
    state = {
      loading: false
    };
    componentWillMount() {
        const {findPackage} = this.props;
        findPackage({
            query: {
                $sort: {
                    value: 1
                }
            }
        });

    }

    handleDelete = (r) => {
        const {removePackage} = this.props;
        removePackage(r._id);
    };
    onPageChange = (e, p) => {
        const {findPackage} = this.props;
        findPackage({
            query: {
                $skip: 10 * (e - 1),
                $sort: {
                    value: 1
                }
            }
        });
    };

    // Package Form Edit
    state = {editPackageVisible: false};

    showEditPackageModal = (record) => {
        this.setState({
            record,
            editPackageVisible: true
        });
    };

    editPackageHandleOk = (e) => {
        console.log(e);
        this.setState({
            editPackageVisible: false
        });
    };

    editPackageHandleCancel = (e) => {
        console.log(e);
        this.setState({
            editPackageVisible: false
        });
    };

    onPackageEditSubmit = (value) => {
        const {updatelocal} = this.props;
        this.setState({loading: true})
        Client.service('packages').patch(value._id, value)
            .then(ref => {
                this.setState({loading: false})
                updatelocal(ref)
                this.setState({
                    editPackageVisible: false
                });
                message.success('Package has been updated');
            })
            .catch(e => {
                this.setState({loading: false})
                message.error(e.message);
            })
    };

    render() {

        const {gutter} = basicStyle;
        const {packages, total} = this.props;
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: (text, record) => {
                    if (record.country !== undefined) {
                        return <span>
                        {record.title} - {record.country}
                    </span>
                    } else {
                        return <span>{record.title} </span>
                    }
                }
            }, {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                render: value => `$ ${value}`
            }, {
                title: 'Direct Sponsor',
                dataIndex: 'sponsor',
                key: 'sponsor',
                render: value => `${value} %`
            }, {
                title: 'Pairing Commission',
                dataIndex: 'pairing',
                key: 'pairing',
                render: value => `${value} %`
            }, {
                title: 'Fast Start',
                dataIndex: 'fast',
                key: 'fast',
                render: value => `${value} %`
            }, {
                title: 'Leadership bonus',
                dataIndex: 'leadership',
                key: 'leadership',
                render: value => `${value} %`
            }, {
                title: 'Level Capping',
                dataIndex: 'levelcap',
                key: 'levelcap',
            }, {
                title: 'Leadership depth',
                dataIndex: 'leaderlevels',
                key: 'leaderlevels',
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>


      <a onClick={e => this.showEditPackageModal(record)}>edit</a>



      <Divider type="vertical"/>
      <a onClick={e => this.handleDelete(record)}>Delete</a>
    </span>
                ),
            }];
        return (

            <LayoutContentWrapper style={{}}>
                <Modal
                    title="Basic Modal"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.editPackageVisible}
                    onCancel={this.editPackageHandleCancel}
                    destroyOnClose={true}
                    footer={null}
                >
                    <EditPackageForm packageData={this.state.record}
                                     packageModalClose={() => this.editPackageHandleCancel}
                                     onPackageEditSubmit={(value) => this.onPackageEditSubmit(value)}/>
                </Modal>
                <PageHeader>Packages</PageHeader>
                <LayoutContent>
                    <Row type={'flex'} justify={'end'} style={{marginBottom: '15px'}} gutter={gutter}>

                        <Button type={'primary'} style={{marginRight: '10px'}}
                                onClick={e => this.props.history.push('/admin/packages/create')}>Add
                            Package</Button>

                    </Row>
                    <Table size="small" rowKey='_id' columns={columns} dataSource={packages}
                           pagination={{position: 'none'}} scroll={{ x: 1000 }} />
                    <Pagination size="small" style={{marginTop: '10px', float: 'right'}}
                                onChange={(e, p) => this.onPageChange(e, p)}
                                total={total}/>

                </LayoutContent>
            </LayoutContentWrapper>
        )
    }

}

export default connect(
    state => ({
        packages: state.Packages.packages,
        total: state.Packages.total,
        height: state.App.toJS().height
    }),
    {findPackage, removePackage, updatelocal}
)(Packages);
