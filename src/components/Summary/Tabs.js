import React from 'react';
import { TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col
} from 'reactstrap';
import classnames from 'classnames';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { activeTab : '1'};
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
  render() {
    return (
      <div>
        <Nav tabs>
            {this.props.headers.map((value,index) =>
                <NavItem> 
                    <NavLink className={classnames({ active : this.state.activeTab === { index }})}
                        onClick={ () => { this.toggle({ index }); 
                    }}>
                            <h5>{ value }</h5>
                            <i>Sunny Weather</i>
                    </NavLink>
                </NavItem>
            )}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}