package smtp

import (
	"crypto/tls"
	"errors"
	"net"
	"net/smtp"

	"github.com/zitadel/logging"

	"github.com/zitadel/zitadel/internal/notification/channels"
	"github.com/zitadel/zitadel/internal/notification/messages"
	"github.com/zitadel/zitadel/internal/zerrors"
)

var _ channels.NotificationChannel = (*Email)(nil)

type Email struct {
	smtpClient     *smtp.Client
	senderAddress  string
	senderName     string
	replyToAddress string
}

func InitChannel(cfg *Config) (*Email, error) {
	client, err := cfg.SMTP.connectToSMTP(cfg.Tls)
	if err != nil {
		logging.New().WithError(err).Error("could not connect to smtp")
		return nil, err
	}
	logging.New().Debug("successfully initialized smtp email channel")
	return &Email{
		smtpClient:     client,
		senderName:     cfg.FromName,
		senderAddress:  cfg.From,
		replyToAddress: cfg.ReplyToAddress,
	}, nil
}

func (email *Email) HandleMessage(message channels.Message) error {
	defer email.smtpClient.Close()
	emailMsg, ok := message.(*messages.Email)
	if !ok {
		return zerrors.ThrowInternal(nil, "EMAIL-s8JLs", "message is not EmailMessage")
	}

	if emailMsg.Content == "" || emailMsg.Subject == "" || len(emailMsg.Recipients) == 0 {
		return zerrors.ThrowInternalf(nil, "EMAIL-zGemZ", "subject, recipients and content must be set but got subject %s, recipients length %d and content length %d", emailMsg.Subject, len(emailMsg.Recipients), len(emailMsg.Content))
	}
	emailMsg.SenderEmail = email.senderAddress
	emailMsg.SenderName = email.senderName
	emailMsg.ReplyToAddress = email.replyToAddress
	// To && From
	if err := email.smtpClient.Mail(emailMsg.SenderEmail); err != nil {
		return zerrors.ThrowInternalf(err, "EMAIL-s3is3", "could not set sender: %v", emailMsg.SenderEmail)
	}
	for _, recp := range append(append(emailMsg.Recipients, emailMsg.CC...), emailMsg.BCC...) {
		if err := email.smtpClient.Rcpt(recp); err != nil {
			return zerrors.ThrowInternalf(err, "EMAIL-s4is4", "could not set recipient: %v", recp)
		}
	}

	// Data
	w, err := email.smtpClient.Data()
	if err != nil {
		return err
	}

	content, err := emailMsg.GetContent()
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(content))
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}

	return email.smtpClient.Quit()
}

func (smtpConfig SMTP) connectToSMTP(tlsRequired bool) (client *smtp.Client, err error) {
	host, _, err := net.SplitHostPort(smtpConfig.Host)
	if err != nil {
		return nil, zerrors.ThrowInternal(err, "EMAIL-spR56", "could not split host and port for connect to smtp")
	}

	if !tlsRequired {
		client, err = smtpConfig.getSMTPClient()
	} else {
		client, err = smtpConfig.getSMTPClientWithTls(host)
	}
	if err != nil {
		return nil, err
	}

	err = smtpConfig.smtpAuth(client, host)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func (smtpConfig SMTP) getSMTPClient() (*smtp.Client, error) {
	client, err := smtp.Dial(smtpConfig.Host)
	if err != nil {
		return nil, zerrors.ThrowInternal(err, "EMAIL-skwos", "could not make smtp dial")
	}
	return client, nil
}

func (smtpConfig SMTP) getSMTPClientWithTls(host string) (*smtp.Client, error) {
	conn, err := tls.Dial("tcp", smtpConfig.Host, &tls.Config{})

	if errors.As(err, &tls.RecordHeaderError{}) {
		logging.Log("MAIN-xKIzT").OnError(err).Warn("could not connect using normal tls. trying starttls instead...")
		return smtpConfig.getSMTPClientWithStartTls(host)
	}

	if err != nil {
		return nil, zerrors.ThrowInternal(err, "EMAIL-sl39s", "could not make tls dial")
	}

	client, err := smtp.NewClient(conn, host)
	if err != nil {
		return nil, zerrors.ThrowInternal(err, "EMAIL-skwi4", "could not create smtp client")
	}
	return client, err
}

func (smtpConfig SMTP) getSMTPClientWithStartTls(host string) (*smtp.Client, error) {
	client, err := smtpConfig.getSMTPClient()
	if err != nil {
		return nil, err
	}

	if err := client.StartTLS(&tls.Config{
		ServerName: host,
	}); err != nil {
		return nil, zerrors.ThrowInternal(err, "EMAIL-guvsQ", "could not start tls")
	}
	return client, nil
}

func (smtpConfig SMTP) smtpAuth(client *smtp.Client, host string) error {
	if !smtpConfig.HasAuth() {
		return nil
	}
	// Auth
	auth := unencryptedAuth{
		smtp.PlainAuth("", smtpConfig.User, smtpConfig.Password, host),
	}
	err := client.Auth(auth)
	if err != nil {
		return zerrors.ThrowInternalf(err, "EMAIL-s9kfs", "could not add smtp auth for user %s", smtpConfig.User)
	}
	return nil
}
