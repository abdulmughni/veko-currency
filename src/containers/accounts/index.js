import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import {connect} from 'react-redux';
import usersActions from '../../redux/users/actions';
import IntlMessages from '../../components/utility/intlMessages';

import {
    Table,
    Pagination,
    Row,
    Input,
    Button,
    Divider,
    Select,
    Icon,
    Modal,
    notification,
    Spin,
    Alert,
    message
} from 'antd';
import Moment from 'react-moment';
import PageHeader from "../../components/utility/pageHeader";
import {app, Client} from '../../settings/index'
import GenealogyTree from '../../components/genealogyTree';
import PopupForm from './editForm';

const Option = Select.Option;
const {findUser, localPatch} = usersActions;

export class Accounts extends Component {
    state = {
      loading: false
    };
    constructor(props) {
        super(props);
        if (this.props.profile.role === 'admin') {
            this.state = {
                query: {
                    $sort: {
                        createdAt: -1
                    }
                },
                showTree: false,
                treeData: [],
                gettingData: false,
                treeMember: ''
            };
        } else {
            this.state = {
                query: {
                    sponsorId: this.props.profile._id,
                    $sort: {
                        createdAt: -1
                    }
                },
                showTree: false,
                treeData: [],
                gettingData: false,
                treeMember: ''
            };
        }

    }

    state = {
        editUserVisible: false
    };

    // Modal Part
    showModal = () => {
        this.setState({
            editUserVisible: true,
        });
    };

    handleOk = (e) => {
        this.setState({
            showTree: false,
            treeData: [],
            treeMember: ''
        });
    };

    handleCancel = (e) => {
        this.setState({
            showTree: false,
            treeData: [],
            treeMember: ''
        });
    };

    popupCancel = (e) => {
        this.setState({
            editUserVisible: false
        });
    };


    memberTree = (data) => {
        this.setState({gettingData: true, showTree: true, treeMember: data});
        app.service('stats').get(data._id, {query: {action: 'memberTree'}})
            .then(data => {
                this.setState({treeData: data, gettingData: false})
            })
            .catch(e => {
                this.setState({treeData: [], gettingData: false});
                notification.error(e.message);
            })
    };

    componentWillMount() {
        this.findUsers()
    }

    onPageChange = (e, p) => {
        this.setState({query: Object.assign({}, this.state.query, {$skip: 10 * (e - 1)})}, () => this.findUsers())

    };
    searchMembers = (member) => {

        this.setState({search: member})
        if (member !== '') {
            let q = this.state.query;
            delete q.$skip;
            this.setState({query: Object.assign({}, q, {_id: {$search: member}})}, () => this.findUsers());
        } else {
            let q = this.state.query;
            delete q.$skip;
            delete q._id;
            this.setState({query: Object.assign({}, q)}, () => this.findUsers());

        }
    };
    findUsers = () => {
        const {findUser} = this.props
        findUser({
            query: this.state.query
        });
    };

    statusSelect = (val) => {
        let q = this.state.query;
        delete q.$skip;
        if (val !== undefined) {
            this.setState({query: Object.assign({}, q, {role: val})}, () => this.findUsers());
        } else {
            delete q.role;
            this.setState({query: Object.assign({}, q)}, () => this.findUsers());
        }
    };
    onUserEditSubmit = (value) => {

        //console.log(value);
        const {localPatch} = this.props
        this.setState({loading: true})
        Client.service('users').patch(value._id, value)
            .then(res => {
                this.setState({loading: false})
                localPatch(res);
                this.setState({
                    editUserVisible: false
                });
                message.success('User has been updated');
            })
            .catch(e => {
                this.setState({loading: false})
                message.error(e.message);
            })


    };

    render() {

        const {accounts, total} = this.props;

        // Modal Part
        const {editUserVisible} = this.state;

        const columns = [
            {
                title: <IntlMessages id="member.register-member.username"/>,
                dataIndex: '_id',
                key: '_id',
            },
            {
                title: <IntlMessages id="member.register-member.name"/>,
                dataIndex: 'firstname',
                key: 'name',
                render: (text, record) => record.firstname + ' ' + record.lastname
            }, {
                title: <IntlMessages id="member.sponsored-members.package"/>,
                dataIndex: 'package.title',
                key: 'package',
            },
            {
                title: <IntlMessages id="member.sponsored-members.status"/>,
                dataIndex: 'role',
                key: 'role'
            },
            {
                title: <IntlMessages id="member.sponsored-members.country"/>,
                dataIndex: 'address.country',
                key: 'country'
            },
            {
                title: <IntlMessages id="member.sponsored-members.tree"/>,
                key: 'tree',
                render: (text, record) => record.role === 'member' ?
                    <Icon onClick={e => this.memberTree(record)}
                          style={{transform: 'rotate(90deg)', color: '#42a5f6', cursor: 'pointer'}}
                          type="share-alt"/> : ''
            },
            {
                title: <IntlMessages id="member.sponsored-members.membershipDate"/>,
                dataIndex: 'membershipDate',
                key: 'membershipDate',
                render: text => <Moment format="DD MMM YY">
                    {text}
                </Moment>
            }];
        const Compo = this.state.gettingData ?
            <Row type={'flex'} justify={'center'} align={'middle'}><Spin spinning={true} size={'large'}/></Row> :
            this.state.treeData.length > 0 ? <GenealogyTree treeData={this.state.treeData}/> :
                <Row type={'flex'} justify={'center'} align={'middle'}><Alert message="No Data" type="warning"/></Row>
        ;
        return (
            <LayoutContentWrapper style={{}}>
                <PageHeader><IntlMessages id="page.myClients"/></PageHeader>
                <LayoutContent>
                    {this.props.profile.role === 'admin'
                    &&
                    <div>
                        <Modal
                            title={this.state.treeMember.firstname + " " + this.state.treeMember.lastname + ' - ' + this.state.treeMember._id + '\'s Tree'}
                            visible={this.state.showTree}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            style={{top: '20px'}}
                            width={'85%'}
                        >
                            {Compo}
                        </Modal>
                        <Row>
                            <Input value={this.state.search} placeholder={'Search Members'}
                                   style={{width: '200px', marginRight: '10px'}}
                                   onChange={e => this.searchMembers(e.target.value)}/>
                            <Button type="primary" size={'small'} shape="circle" style={{marginRight: '5px'}}
                                    icon="search"/>
                            <Button type="danger" onClick={e => this.searchMembers('')} size={'small'} shape="circle"
                                    icon="close"/>
                            <Select
                                showSearch
                                allowClear={true}
                                style={{width: 200, marginLeft: '20px'}}
                                placeholder="Select by Status"
                                optionFilterProp="children"
                                onChange={this.statusSelect}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="member">Member</Option>
                                <Option value="applicant">Applicant</Option>
                                <Option value="guest">Guest</Option>
                            </Select>
                        </Row>

                        <Divider/>
                    </div>

                    }

                    <Table dataSource={accounts} size="small" columns={columns} scroll={{ x: 740 }}
                           pagination={{position: 'none'}} rowKey={record => record._id}
                           expandedRowRender={record => record.role !== 'admin' ? <span>
                               <p style={{margin: 0}}> <b>Mobile #</b> {record.mobile}</p>
                               <p style={{margin: 0}}> <b>email #</b> {record.email}</p>
                               <p style={{margin: 0}}><b>Parent:</b> {record.parentId}</p>
                               <p style={{margin: 0}}> <b>Sponsor :</b> {record.sponsorId}</p>
                               <p style={{margin: 0}}> <b>Address :</b> {record.address.country + ' , ' + record.address.region + ' , ' + record.address.city + ' , ' + record.address.address}</p>
                               {
                                   this.props.profile.role === 'admin'
                                   &&
                                   <p style={{margin: 0}}>
                                       <Button type="primary" onClick={this.showModal}>Edit</Button>
                                       <Modal title="Update User"
                                              visible={editUserVisible}
                                              footer={null}
                                              onCancel={this.popupCancel}
                                              destroyOnClose='true'
                                       >
                                           <PopupForm onUserEditSubmit={this.onUserEditSubmit} user={record}
                                                      cancelButton={() => this.popupCancel}/>
                                       </Modal>

                                   </p>
                               }

                        </span> : ""}
                    />
                    <Pagination size="small" style={{marginTop: '10px', float: 'right'}}
                                onChange={(e, p) => this.onPageChange(e, p)}
                                total={total}/>
                </LayoutContent>
            </LayoutContentWrapper>
        )
            ;
    }
}

export default connect(state => ({
    accounts: state.Users.users,
    total: state.Users.total,
    profile: state.Auth.profile,
}), {findUser, localPatch})(Accounts)
