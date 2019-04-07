#!/usr/bin/python3.6

import string
import json
import csv
import time
from datetime import date
import mysql.connector
from mysql.connector import errorcode
# MassCash - start date: March 1991

DB_NAME = 'masslottodb'

def connect():
    global conn
    """ Connect to MySQL database """
    try:
        conn = mysql.connector.connect(host='192.168.1.249',    # your host, usually localhost
                     user='mysqladmin',         # your username
                     passwd='Admin4@ll!',  # your password
                     db=DB_NAME,        # name of the data base
                     auth_plugin='mysql_native_password')

        if conn.is_connected():
            cursor = conn.cursor(buffered=True)
            print('Connected to MySQL database.')
            return cursor

    except ValueError as e:
        print(e)
        return 0

def disconnect():
    print('Disconnecting from MySQL database...')
    conn.close()
    print('Disconnected.')


if __name__ == '__main__':
    cursor = connect()

    try:
        cursor.execute("USE {}".format(DB_NAME))
        print("Found database: {}".format(DB_NAME))
    except mysql.connector.Error as err:
        print("Database {} does not exists.".format(DB_NAME))
        if err.errno == errorcode.ER_BAD_DB_ERROR:
            create_database(cursor)
            print("Database {} created successfully.".format(DB_NAME))
            conn.database = DB_NAME
        else:
            print(err)
            exit(1)

    query = ("DROP table MassCashTbl;")

    cursor.execute(query)

    conn.commit()
    cursor.close()
    disconnect()


