import styled, {css} from 'styled-components';
import { palette } from 'styled-theme';

const TicketWrapper = styled.div`
    width: 100%;
    float: left;
    background: #ffffff;
    border-radius: 10px;
    border: solid 1px #dadada;
    margin-bottom: 30px;
    cursor: pointer;

    .ticketFirstRow {
      padding: 30px 30px 20px 0px;
    }

    .ticketFirstRow .ant-card-meta-title {
      font-size: 20px;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
      color: #333333;
      font-weight: 400;
    }

    @media only screen and (max-width: 768px) {
      .ticketFirstRow .ant-card-meta-detail {
          padding: 20px;
      }
    }

    .ticketSecondRow {
      margin-left: 0px !important;
      margin-right: 0px !important;
      border-top: solid 1px #eaeaea;
    }

    .ticketSecondRow .ant-col-sm-24 {
      padding: 24px 40px !important;
      border-right: solid 1px #eaeaea;
    }

    .ticketSecondRow .ant-card-meta-title {
      margin-bottom: 0px !important;
      font-size: 15px;
      color: #494949;
    }

    .ant-card-meta-avatar i { margin-top: 5px; }

    .ant-card-meta-avatar .anticon-clock-circle-o {
      color: #7ed321;
      font-size: 30px;
    }

    .ant-card-meta-avatar .anticon-clock-circle-o {
      color: #7ed321;
      font-size: 30px;
    }

    .ant-card-meta-avatar .anticon-fork {
      font-size: 25px;
      color: #422999;
    }

    .status {
      padding: 5px;
      color: #ffffff;
      text-transform: uppercase;
      display: block;
      text-align: center;
    }
    .status.open {
      background: ${ palette('success', 0) };
    }
    .status.close {
      background: ${ palette('error', 0) };
    }

`;

const Status = styled.span`

`;

export { TicketWrapper, Status };
