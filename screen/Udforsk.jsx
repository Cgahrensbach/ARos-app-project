import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const Udforsk = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);

  const ticketPrices = {
    adult: 180,
    child: 0,
  };

  const totalPrice = (adultTickets * ticketPrices.adult) + (childTickets * ticketPrices.child);
  
  const handleIncrease = (type) => {
    if (type === 'adult') {
      setAdultTickets(adultTickets + 1);
    } else if (type === 'child') {
      setChildTickets(childTickets + 1);
    }
  };

  const handleDecrease = (type) => {
    if (type === 'adult' && adultTickets > 0) {
      setAdultTickets(adultTickets - 1);
    } else if (type === 'child' && childTickets > 0) {
      setChildTickets(childTickets - 1);
    }
  };

  const handleBook = () => {
    setModalVisible(false);
    alert(`Du har booket ${adultTickets} voksen billet${adultTickets > 1 ? 'ter' : ''} og ${childTickets} børne billet${childTickets > 1 ? 'ter' : ''}.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../billeder/billedeartist.jpg')}
          style={styles.image}
          accessibilityLabel="Mange ansigter"
        />
        <View style={styles.textOverlay}>
          <Text style={styles.subtitle}>Mange ansigter</Text>
          <Text style={styles.artist}>Peter Pan</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Image
          source={require('../billeder/billede1.jpg')}
          style={styles.circularImage}
          accessibilityLabel="Peter Pan Profile Picture"
        />
        <View style={styles.details}>
          <Text style={styles.artistName}>Peter Pan</Text>
          <Text style={styles.date}>Udstilling: 05/08/2024</Text>
        </View>
      </View>

      <Text style={styles.description}>
        Livet er nogle gange hårdt. Ting går galt, i livet og i kærligheden og i erhvervslivet og i venskab og sundhed og på alle andre måder; livet kan gå galt. Og når tingene bliver svære, er det, hvad du skal gøre. Lav god kunst.
      </Text>

      <View style={styles.buttonContainer}>
        <View style={styles.button2}>
          <Button
            title="Bestil billet"
            color="#fff"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Bestil din billet</Text>

          <View style={styles.ticketSection}>
            <Text style={styles.ticketTitle}>Voksen billetter 120kr</Text>
            <View style={styles.ticketControls}>
              <TouchableOpacity style={styles.controlButton} onPress={() => handleDecrease('adult')}>
                <Text style={styles.controlText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.ticketCount}>{adultTickets}</Text>
              <TouchableOpacity style={styles.controlButton} onPress={() => handleIncrease('adult')}>
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.ticketPriceText}>Pris: {adultTickets * ticketPrices.adult} DKK</Text>
          </View>

          <View style={styles.ticketSection}>
            <Text style={styles.ticketTitle}>Børne billetter gratis (under 18)</Text>
            <View style={styles.ticketControls}>
              <TouchableOpacity style={styles.controlButton} onPress={() => handleDecrease('child')}>
                <Text style={styles.controlText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.ticketCount}>{childTickets}</Text>
              <TouchableOpacity style={styles.controlButton} onPress={() => handleIncrease('child')}>
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.ticketPriceText}>Pris: {childTickets * ticketPrices.child} DKK</Text>
          </View>

          <Text style={styles.totalPriceText}>Total Pris: {totalPrice} DKK</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.proceedButton}
              onPress={handleBook}
            >
              <Text style={styles.proceedButtonText}>Book aftale</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Luk</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.noticeText}>
            * Fremvis billetten på din telefon eller som udprint. Din entrébillet til ARoS er gyldig hele dagen – du kan gå ind og ud af museet som du lyster. Husk at du på dagen kan få refunderet din entrébillet, hvis du køber årskort.
          </Text>
        </View>
      </Modal>

      <View style={styles.gallery}>
        <Text style={styles.moreWorks}>Se flere værker</Text>
        <View style={styles.imagesRow}>
          <Image
            source={require('../billeder/billede1.jpg')}
            style={styles.thumbnail}
            accessibilityLabel="Art 1"
          />
          <Image
            source={require('../billeder/billede2.jpg')}
            style={styles.thumbnail}
            accessibilityLabel="Art 2"
          />
          <Image
            source={require('../billeder/billede3.jpg')}
            style={styles.thumbnail}
            accessibilityLabel="Art 3"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    paddingTop: 100,
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#888',
  },
  detailsRow: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  circularImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    flexDirection: 'column',
  },
  artistName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  button2: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#D90429',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery: {
    paddingVertical: 20,
  },
  moreWorks: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    padding: 25,
    backgroundColor: '#fff',
    marginBottom: -50,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  ticketSection: {
    width: '100%',
    marginBottom: 20,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ticketControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#D90429',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketCount: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  ticketPriceText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'left',
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#1DA172',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  proceedButton: {
    backgroundColor: '#1DA172',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#D90429',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noticeText: {
    marginTop: 50,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
});

export default Udforsk;
