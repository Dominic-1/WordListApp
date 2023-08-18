// components/WordList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const WordList = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get('https://api.example.com/words');
      setWords(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching words. Please try again later.');
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.word}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={words}
      renderItem={renderItem}
      keyExtractor={(item) => item.word}
      contentContainerStyle={{ paddingVertical: 20 }}
    />
  );
};

export default WordList;
