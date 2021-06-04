import React, { useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components/native";
import Masukan from "./Components/Masukan";
import TodoList from "./Components/todolist";
import Header from "./Components/Header";
import Kosongkan from "./Components/Kosongkan";
import Footer from "./Components/Footer";


export default function App() {
	const [ data, setData ] = useState([]);
	
	const submitHandler = (value) => {
		setData((prevTodo) => {
			return [
			{
				value: value,
				key: Math.random().toString(),
			},
			...prevTodo,
			];
		});
	};
	
	
	const deleteItem = (key) => {
		setData((prevTodo) => {
			return prevTodo.filter((todo) => todo.key != key );
		});
	};
	
	
	return (
		<ComponentContainer>
			<View>
				<StatusBar barStyled="light-content"
					backgroundColor="midnightblue" />
			</View>
			
			<View>
				<FlatList
					data={data}
					ListHeaderComponent={() => <Header />}
					ListEmptyComponent={() => <Kosongkan />}
					ListFooterComponent={() => <Footer />}
					keyExtractor={(item) => item.key }
					renderItem={({ item }) => (
						<TodoList item={item} deleteItem={deleteItem} />
					)}
				/>
			
				<View>
				<Masukan submitHandler={submitHandler} />
				</View>
			</View>
		
		</ComponentContainer>		
	);
}

const ComponentContainer = styled.View`
	background-color: lightslategrey;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
