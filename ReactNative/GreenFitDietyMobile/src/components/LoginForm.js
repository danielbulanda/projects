import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Card, CardSection, Input, ButtonBottom, Spinner, Button, ErrorText } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import Contact from './Contact';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(password) {
    this.props.passwordChanged(password);
  }

  onButtonPressed(provider) {
    const { email, password } = this.props;
    this.props.loginUser({ email, password, provider });
  }

  shouldRenderContactPage() {
    if (this.props.contact === true) {
      return (
        <Animatable.View
          animation="bounceIn"
          iterationCount={1}
          direction="alternate"
          duration={800}
        >
          <Contact title="Problemy z logowaniem?" />
        </Animatable.View>
      );
    }
  }

  renderButton(type) {
    switch (type) {
      case 'facebook':
        if (this.props.loading === 'facebook') {
          return <Spinner size="small" />;
        }
        return (
          <Button
            name={type}
            color="#3b5998"
            onPress={this.onButtonPressed.bind(this, 'facebook')}
            text="Używając konta Facebook"
          />
        );
      case 'google':
        if (this.props.loading === 'google') {
          return <Spinner size="small" />;
        }
        return (
          <Button
            name={type}
            color="#bd3a28"
            onPress={this.onButtonPressed.bind(this, 'google')}
            text="Używając konta Google"
          />
        );
      case 'send':
        if (this.props.loading === 'email') {
          return <Spinner size="small" />;
        }
        return (
          <ButtonBottom onPress={this.onButtonPressed.bind(this, 'email')}>
            Wyślij
          </ButtonBottom>
        );
      default:
          return;
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          <Animatable.View
            animation="bounceIn"
            iterationCount={1}
            direction="alternate"
            duration={800}
          >
            <Card title="Zaloguj się">
              <CardSection>
                {this.renderButton('facebook')}
              </CardSection>
              <CardSection>
                {this.renderButton('google')}
              </CardSection>
              <CardSection>
                <Input
                  placeholder="email@gmail.com"
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.props.email}
                />
              </CardSection>
              <CardSection>
                <Input
                  secureTextEntry
                  placeholder="hasło"
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                />
              </CardSection>
              <ErrorText>
                {this.props.error}
              </ErrorText>
              <CardSection style={{ paddingBottom: 0 }}>
                {this.renderButton('send')}
              </CardSection>
            </Card>
            {this.shouldRenderContactPage()}
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    marginVertical: 5,
    paddingTop: 40
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, contact } = auth;
  return { email, password, error, loading, contact };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
