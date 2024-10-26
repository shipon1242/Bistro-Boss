
import { useState } from "react";
import orderCoverImg from"../../../assets/shop/banner2.jpg"
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UseMenu from "../../../hooks/UseMenu";

import OrderTab from "../OrderTab/OrderTab";
import { Navigate,  useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
  const categories =['salad',"pizza",'soups','desserts']
  const {category} = useParams()
 
  
  
  const initialIndex =categories.indexOf(category)
  
  const [tabIndex,setTabIndex]=useState(initialIndex)
    const [menu]=UseMenu()
    const drinks = menu.filter(item=> item.category==="drinks")
    const pizza = menu.filter(item=> item.category==="pizza")
    const desserts = menu.filter(item=> item.category==="dessert")
    const salads = menu.filter(item=> item.category==="salad")
    const soups = menu.filter(item=> item.category==="soup")
   
   
    
    return (
        <div className="space-y-8 ">
           <Helmet>
                <title>Bistro Boss | order food</title>
            </Helmet>
            <Cover img={orderCoverImg} title="Order food" subTitle="Would you like to try a dish?"></Cover>
            <Tabs className="px-6 " defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  <TabList className="px-4">
    <Tab>SALAD</Tab>
    <Tab>PIZZA</Tab>
    <Tab>SOUPS</Tab>
    <Tab>DESSERTS</Tab>
    <Tab>DRINKS</Tab>
  </TabList>
  <TabPanel> 
  <Navigate to="/order/salad"></Navigate>
    <OrderTab   items={salads}></OrderTab>
    </TabPanel>

  <TabPanel>
    <Navigate to="/order/pizza"></Navigate>
  <OrderTab items={pizza}></OrderTab>
  </TabPanel>
  <TabPanel>
  <Navigate to="/order/soups"></Navigate>
  <OrderTab items={soups}></OrderTab>
  </TabPanel>
  <TabPanel>
  <Navigate to="/order/desserts"></Navigate>
  <OrderTab items={desserts}></OrderTab>
  </TabPanel>
  <TabPanel>
  <Navigate to="/order/drinks"></Navigate>
  <OrderTab items={drinks}></OrderTab>
  </TabPanel>
</Tabs>
        </div>
    );
};

export default Order;