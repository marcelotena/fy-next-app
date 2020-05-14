import axios from 'axios';
import { DEMO_API } from "../utils/constants";

export default axios.create({
  baseURL: DEMO_API
});