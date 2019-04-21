import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import GenealogyTree from '../../components/genealogyTree';
import PageHeader from "../../components/utility/pageHeader";
import {connect} from 'react-redux';
import treeActions from '../../redux/tree/actions';
import IntlMessages from '../../components/utility/intlMessages';
import {Row, Spin, Select, Divider} from 'antd';

const {Option} = Select;

const {getTree, selectMember} = treeActions;

export class Tree extends Component {
    constructor() {
        super();
        this.state = {memberTree: []};
    }

    componentWillMount() {

        const {getTree, profile} = this.props;
        getTree(profile._id);
    }

    componentDidMount() {
        const {tree} = this.props;
        this.setState({memberTree: tree});
    }

    memberTree = (val, tree) => {
        let member = undefined;
        let subNodes = [];
        let found = false;
        for (let m of tree) {
            if (m.name === val) {

                found = true;
                member = m;
                break;
            } else {
                if (m.children && m.children.length > 0) {
                    m.children.forEach(m => subNodes.push(m))
                }
            }
        }
        if (!found) {
            member = this.memberTree(val, subNodes)
        }
        return member
    };

    memberSelect = (val) => {
        const {tree, selectMember} = this.props;
        if (val !== undefined) {
            this.setState({memberTree: [this.memberTree(val, tree)]});
            selectMember(val);
        } else {
            selectMember(val);
            this.setState({memberTree: tree});
        }

    };

    render() {
        const {tree, profile, selectedMember} = this.props;
        const {memberTree} = this.state;
        if (selectedMember === undefined && this.state.memberTree.length !== tree.length) {
            this.setState({memberTree: tree})
        }
        const Compo = memberTree.length > 0 ? <GenealogyTree treeData={memberTree}/> :
            <Row type={'flex'} justify={'center'} align={'middle'}><Spin spinning={true} size={'large'}/></Row>;
        return (
            <LayoutContentWrapper style={{}}>
                <PageHeader><IntlMessages id="network.genealogyTree"/></PageHeader>
                <LayoutContent>
                    <Row type={'flex'} style={{marginBottom: '10px'}} justify={'center'} align={'middle'}>
                        <Select
                            showSearch
                            style={{width: 300}}
                            placeholder={<IntlMessages id="member.exchange.selectATeamMemberTree"/>}
                            optionFilterProp="children"
                            onChange={this.memberSelect}
                            allowClear={true}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {profile.team.map(m => <Option key={m}>{m}</Option>)}
                        </Select>
                    </Row>
                    <Divider/>
                    <Row>
                        {Compo}
                    </Row>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

export default connect(state => ({
    tree: state.Tree.tree,
    selectedMember: state.Tree.selectedMember,
    loading: state.Tree.loading,
    profile: state.Auth.profile
}), {getTree, selectMember})(Tree)
