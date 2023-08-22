import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import icons from '../assets/icons';

export default function CreateParty() {
  const categories = [
    '아웃도어/여행',
    '운동/스포츠',
    '문화/공연/축제',
    '봉사활동',
    '사진/영상',
    '게임/오락',
    '요리/제조',
    '유흥',
    '기타',
  ];
  const outdoor = ['캠핑', '낚시', '등산', '패러글라이딩', '여행', '걷기'];
  const sports = [
    '배드민턴',
    '야구',
    '농구',
    '당구',
    '볼링',
    '복싱',
    '자전거',
    '다이어트',
    '족구',
    '탁구',
    '러닝',
    '스키',
    '축구',
    '수영',
    '테니스',
    '헬스',
    '요가',
  ];
  const culture = ['미술관', '축제', '영화', '오페라', '연극'];
  const volunteer = ['동물보호소', '교육', '환경보호', '요양원', '어린이집'];
  const photo = ['DSLR카메라', '필름카메라', '비디오'];
  const game = ['보드게임', '콘솔게임', '그룹게임', '마술', '온라인게임'];
  const cooking = ['한식', '중식', '일식', '양식', '제빵', '캌테일'];
  const pleasure = ['클럽', '술', '헌팅'];
  const [selected, setSelected] = useState(''); // 선택된 카테고리
  const [detailCategory, setDetailCategory] = useState(''); //세부 카테고리 선택

  const [selectedDate, setSelectedDate] = useState('');

  const handleCategorySelect = category => {
    // 카테고리가 선택(터치)되었을 때 함수
    setSelected(category);
  };
  const handleDetailCategorySelect = category => {
    // 세부카테고리가 선택되었을 때 함수
    setDetailCategory(category);
  };
  // 시간 선택 모달
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('A date has been picked: ', date);
    hideDatePicker();
  };
  //시간 선택모달 여기까지

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, marginTop: 40}}>
        카테고리를 선택해주세요
      </Text>
      <View>
        <ScrollView horizontal>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selected === category && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelect(category)}>
              {category == '아웃도어/여행' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.OUTDOOR}></Image>
              )}
              {category == '운동/스포츠' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.SPORTS}></Image>
              )}
              {category == '문화/공연/축제' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.CULTURE}></Image>
              )}
              {category == '봉사활동' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.VOLUNTEER}></Image>
              )}
              {category == '사진/영상' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.PHOTO}></Image>
              )}
              {category == '게임/오락' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.GAME}></Image>
              )}
              {category == '요리/제조' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.COOKING}></Image>
              )}
              {category == '유흥' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.ADULT}></Image>
              )}
              {category == '기타' && (
                <Image
                  style={[
                    styles.icon,
                    selected === category && styles.iconTintColor,
                  ]}
                  source={icons.ETC}></Image>
              )}

              <Text
                style={[
                  styles.categoryButtonText,
                  selected === category && styles.selectedCategoryButtonText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {
        //세부 카테고리 확인
      }
      {selected === '아웃도어/여행' && (
        <View>
          <ScrollView horizontal>
            {outdoor.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  detailCategory === item && styles.selectedCategoryButton,
                ]}
                onPress={() => handleDetailCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    detailCategory === item &&
                      styles.selectedCategoryButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {selected === '운동/스포츠' && (
        <View>
          <ScrollView horizontal>
            {sports.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  detailCategory === item && styles.selectedCategoryButton,
                ]}
                onPress={() => handleDetailCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    detailCategory === item &&
                      styles.selectedCategoryButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {selected === '문화/공연/축제' && (
        <View>
          <ScrollView horizontal>
            {culture.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  detailCategory === item && styles.selectedCategoryButton,
                ]}
                onPress={() => handleDetailCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    detailCategory === item &&
                      styles.selectedCategoryButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {selected === '봉사활동' && (
        <View>
          <ScrollView horizontal>
            {volunteer.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  detailCategory === item && styles.selectedCategoryButton,
                ]}
                onPress={() => handleDetailCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    detailCategory === item &&
                      styles.selectedCategoryButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {selected === '사진/영상' && (
        <View>
          <ScrollView horizontal>
            {photo.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  detailCategory === item && styles.selectedCategoryButton,
                ]}
                onPress={() => handleDetailCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    detailCategory === item &&
                      styles.selectedCategoryButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {selected === '게임/오락' && (
        <View>
          <ScrollView horizontal>
            {game.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  detailCategory === item && styles.selectedCategoryButton,
                ]}
                onPress={() => handleDetailCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    detailCategory === item &&
                      styles.selectedCategoryButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {selected === '요리/제조' && (
        <View>
          <ScrollView horizontal>
            {cooking.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  detailCategory === item && styles.selectedCategoryButton,
                ]}
                onPress={() => handleDetailCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    detailCategory === item &&
                      styles.selectedCategoryButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {selected === '유흥' && (
        <View>
          <ScrollView horizontal>
            {pleasure.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  detailCategory === item && styles.selectedCategoryButton,
                ]}
                onPress={() => handleDetailCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    detailCategory === item &&
                      styles.selectedCategoryButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <Text style={styles.title}>날짜를 선택해주세요</Text>
      <Calendar
        // Set the selected date using selectedDate state
        onDayPress={day => {
          setSelected(day.dateString);
          showDatePicker();
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#4caf50',
          },
        }}
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        mode="time"
        locale="en_GB" // Use "en_GB" here
        date={new Date()}
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#4caf50',
  },
  categoryButtonText: {
    fontSize: 16,
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  iconTintColor: {
    tintColor: '#fff',
  },
});
