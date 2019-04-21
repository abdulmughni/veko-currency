import styled, {css} from 'styled-components';
import { palette } from 'styled-theme';

const ChatWrapper = styled.div`
    width: 100%;
    .messages {
      overflow-y: scroll;
      overflow-x: hidden;
      flex-grow: 1;
      padding: 20px;
      height: 55vh;
    }

    .chat-input {
      position: relative;
      overflow: hidden;
      padding: 0 40px;
      flex-shrink: 0;
    }

    .chat-input .ant-form-item:nth-child(2) {
      width: 80%;
      float: left;
    }

    .chat-input .ant-form-item:nth-child(3),
    .chat-input .ant-form-item:nth-child(4) {
      max-width: 148px;
      width: 100%;
      float: left;

    }

    .chat-input input[type="text"] {
      padding: 25px !important;
      border-radius: 5px 0 0 5px;
      border-right: 0;
    }

    .chat-input button {
      padding: 14.5px;
      width: 100%;
      border: solid 1px #1890ff;
      height: auto;
    }

    .message.from-me .username {
      display: none;
    }

    .message.from-me {
      margin-bottom: 20px;
      width: 100%;
      float: left;
    }

    .message.from-me .message-date {
      text-align: right;
    }

    .message.from-me .message-body {
      background-color: ${palette('primary', 0)};
      color: white;
      float: right;
    }

    .message {
      margin-bottom: 20px;
    }
    .message-body {
      max-width: 80%;
      display: inline-block;
      padding: 20px;
      background-color: #eee;
      border: 1px;
      border-radius: 5px;
      padding-right: 50px;
    }

    .message-date {
      font-size: 12px;
      color: #a6a6a6;
      margin-bottom: 7px;
    }

    .username {
      font-weight: bold;
      font-size: 0.9rem;
      color: #999;
      margin-bottom: 5px;
    }

    .uploadFiles a {
      color: ${ palette('secondary', 0) };
      border: solid 1px #decdb680;
      padding: 3px 10px;
      display: block;
      margin-top: 5px;
    }

    .uploadFiles a:hover {
      color: #333333;
    }

`;

export { ChatWrapper };
