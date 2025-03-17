package main

import (
	"context"
	"fmt"
	"net"
	"time"
)

// App struct
type App struct {
	ctx       context.Context
	redisHost string
	redisPort string
	redisPass string
	redisConn net.Conn
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// ConnectToRedis connects to the Redis server using TCP
func (a *App) ConnectToRedis(host, port, password string) error {
	a.redisHost = host
	a.redisPort = port
	a.redisPass = password
	address := fmt.Sprintf("%s:%s", host, port)
	conn, err := net.DialTimeout("tcp", address, 5*time.Second)
	if err != nil {
		return err
	}
	a.redisConn = conn
	_, err = a.ExecuteRedisCommand("AUTH " + password)
	return nil
}

// CloseRedisConnection closes the Redis connection
func (a *App) CloseRedisConnection() error {
	if a.redisConn != nil {
		return a.redisConn.Close()
	}
	return nil
}

// ExecuteRedisCommand sends a command to the Redis server and reads the response
func (a *App) ExecuteRedisCommand(command string) (string, error) {
	if a.redisConn == nil {
		return "", fmt.Errorf("not connected to Redis")
	}
	_, err := a.redisConn.Write([]byte(command + "\r\n"))
	if err != nil {
		return "", err
	}
	buffer := make([]byte, 1024)
	n, err := a.redisConn.Read(buffer)
	if err != nil {
		return "", err
	}
	return string(buffer[:n]), nil
}
