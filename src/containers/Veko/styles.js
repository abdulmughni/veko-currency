import styled from "styled-components";
import WithDirection from "../../settings/withDirection";

const WDWalletWrapper = styled.div`
.veko {
    color: black;
}
.veko button {
    height: 100%;
    padding: 10px 25px;
}
.veko p {
    padding-top: 8px;
}
.veko h3 {
    color: #4482FF;
}
.veko .ant-table-tbody {
    background-color: white;
}
.veko .ant-table-header {
    overflow: hidden !important;
    padding-bottom: 20px !important;
}
.veko .ant-table-wrapper, .veko .ant-pagination {
    position: absolute;
}
.veko .ant-table-title {
    color: #4482FF;
    font-size: 1.17em;
    font-weight: 500;
}
.config {
    width: 415px;
    height: 700px;
    display: -webkit-inline-box;
}
.config p {
    margin-bottom: 8px;
}
.config h3 {
    display: table-cell;
}
.config .labels p {
    font-weight: 500;
}
.config .ant-input-number {
    margin-bottom: 8px;
}
.config .ant-spin {
    margin-top: -60px;
    margin-left: 100px;
}
.config button {
    margin-left: 4px;
}
.config .edit-buttons button {
    padding: 5px 15px;
    margin-bottom: 5px;
}
.config .edit-buttons .split-roi-buttons {
    margin-top: 175px;
}
.config .edit-buttons .spread {
    margin-top: 38px;
}
.config .last-buttons {
    //margin-top: 380px;
}
.config .last-buttons button {
    padding: 10px 20px;
}
.trades {
    // height: 350px;
    margin-left: 20px;
    width: 600px;
    display: -webkit-inline-box;
}
.admin .trades .ant-tabs {
    width: 610px;
}
.exchange .ant-tabs {
    width: 609px;
    display: inline-block;
}
.buy-sell {
    width: 300px;
    height: 110px;
    margin-left: 10px;
    display: -webkit-inline-box;
}
.wallet {
    width: 200px;
    height: 110px;
    display: -webkit-inline-box;
}
.portfolio {
    width: 400px;
    height: 110px;
    margin-left: 10px;
    display: -webkit-inline-box;
}
.tab-item {
    width: 609px;
    height: 400px;
    margin-top: 15px;
    display: -webkit-inline-box;
}
.tab-item .ant-table-wrapper {
    width: 609px;
}
.tab-item i {
    cursor: pointer;
}
.tab-item .ant-table-thead > tr > th {
    padding: 15px 5px;
}
.tab-item .partial-clear {
    margin-left: 10px;
}
.tab-item button {
    padding: 8px 15px;
}

.buy-sell .ant-row {
    text-align: center
}
.inter-calculations {
    width: 300px;
    height: 190px;
    margin-top: 15px;
    position: absolute;
    margin-left: 10px;
    display: -webkit-inline-box;
}
.inter-calculations h3 {
    padding-bottom: 10px;
}
.inter-calculations .ant-input-number {
    margin-bottom: 8px;
}
.inter-calculations p {
    margin-bottom: 8px;
}
.inter-calculations .button {
    margin-top: 80px;
}`;

const WalletWrapper = WithDirection(WDWalletWrapper);
export {WalletWrapper};
