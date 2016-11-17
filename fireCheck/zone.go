package main

import (
	//"flag"
	"io"
	"fmt"
	"os"
	"time"

	"github.com/goburrow/serial"
)

/*var (
	address  string
	baudrate int
	databits int
	stopbits int
	parity   string

	message string
)*/

func main() {
	//flag.StringVar(&address, "a", "/dev/ttyO2", "address")
	//flag.IntVar(&baudrate, "b", 115200, "baud rate")
	///flag.IntVar(&databits, "d", 8, "data bits")
	//flag.IntVar(&stopbits, "s", 1, "stop bits")
	//flag.StringVar(&parity, "p", "N", "parity (N/E/O)")
	//flag.StringVar(&message, "m", "serial", "message")
	//flag.Parse()

	config := serial.Config{
		Address:  "/dev/ttyO3",
		BaudRate: 115200,
		DataBits: 8,
		StopBits: 1,
		Parity:   "N",
		Timeout:  0 * time.Second,
	}
	//fmt.Fprintf(os.Stdout,"connecting %+v", config)
	port, err := serial.Open(&config)
	if err != nil {
		fmt.Fprintf(os.Stderr,"%s",err)
		os.Exit(1)
	}
	//fmt.Println("connected")
	defer func() {
		err := port.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr,"%s",err)
		}
		os.Exit(1)
	}()
	//if _, err = port.Write([]byte(message)); err != nil {
	//	fmt.Printf("a %s",err)
//	}
	for{
	    var data [8]byte
	    var n1 int
	    if n, err := io.ReadAtLeast(port, data[:], 2); err == nil {
			if data[0] == 0xfe{
			    if data[1] == 0xf0{
		    	    //we read the rest of the bytes
		    	    if n < 7 {
						n1, err = io.ReadFull(port, data[n:7])
						n += n1
		    	    }
		    	    if err == nil{
		    	    	if data[6] == 0x55{
		    	    	fmt.Fprintf(os.Stdout,"%02x %02x %02x %02x",data[4],data[5],0,0)
		    	    	}
		    	    }
				 } 
			    if data[1] == 0xf1{
		    	    //we read the rest of the bytes
		    	    if n < 8 {
						n1, err = io.ReadFull(port, data[n:8])
						n += n1
		    	    }
		    	    if err == nil{
		    	    	if data[7] == 0x55{
		    	    	fmt.Fprintf(os.Stdout,"%02x %02x %02x %02x",data[4],data[5],1,data[6])
		    	    	}
		    	    }
				 } 
			    if data[1] == 0xf2{
		    	    //we read the rest of the bytes
		    	    if n < 7 {
						n1, err = io.ReadFull(port, data[n:7])
						n += n1
		    	    }
		    	    if err == nil{
		    	    	if data[6] == 0x55{
		    	    	fmt.Fprintf(os.Stdout,"%02x %02x %02x %02x",data[4],data[5],2,0)
		    	    	}
		    	    }
				 } 
			    if data[1] == 0xf3{
		    	    //we read the rest of the bytes
		    	    if n < 8 {
						n1, err = io.ReadFull(port, data[n:8])
						n += n1
		    	    }
		    	    if err == nil{
		    	    	if data[7] == 0x55{
		    	    	fmt.Fprintf(os.Stdout,"%02x %02x %02x %02x",data[4],data[5],3,data[6])
		    	    	}
		    	    }
				 }
			    if data[1] == 0xf4{
		    	    //we read the rest of the bytes
		    	    if n < 8 {
						n1, err = io.ReadFull(port, data[n:8])
						n += n1
		    	    }
		    	    if err == nil{
		    	    	if data[7] == 0x55{
		    	    	fmt.Fprintf(os.Stdout,"%02x %02x %02x %02x",data[4],data[5],4,data[6])
		    	    	}
		    	    }
				 }
			}
		}
		
	}
	//if _, err = io.Copy(os.Stdout, port); err != nil {
	//	fmt.Fprintf(os.Stdout,"%s",err)
//	}
}