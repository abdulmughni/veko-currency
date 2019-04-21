import React from 'react';
import Tree from 'react-d3-tree';
import TreeCard from '../Widgets/treeCard/tree-widget'

const containerStyles = {
    width: '100%',
    height: '70vh',
}


export default class GenealogyTree extends React.Component {
    state = {}

    componentDidMount() {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 2,
                y: 100
            }
        });
    }

    render() {
        const {treeData} = this.props;
        return (
            <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
                <Tree
                    orientation='vertical'
                    data={treeData}
                    nodeSvgShape={{shape: "none"}}
                    translate={this.state.translate}
                    initialDepth={10}
                    nodeSize={{x: 300, y: 200}}
                    allowForeignObjects
                    nodeLabelComponent={{
                        render: <TreeCard/>,
                        foreignObjectWrapper: {
                            style: {
                                width: "150px",
                                height: "100px",
                                x: -70,
                                y: -95
                            }
                        }
                    }}
                />

            </div>
        );
    }
}