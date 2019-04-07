#!/usr/bin/python3

import string
import json
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import csv
import time
from datetime import date
import mysql.connector
from mysql.connector import errorcode
# MassCash - start date: March 1991

DB_NAME = 'masslottodb'

TABLES = {}
TABLES['MassCashTbl'] = (
    "CREATE TABLE `MassCashTbl` ("
    "  `draw_id` int(6) unsigned NOT NULL,"
    "  `draw_date` date NOT NULL,"
    "  `draw_date_name` varchar(10) NOT NULL,"
    "  `win1` int(2) NOT NULL,"
    "  `win2` int(2) NOT NULL,"
    "  `win3` int(2) NOT NULL,"
    "  `win4` int(2) NOT NULL,"
    "  `win5` int(2) NOT NULL,"
    "  `ordseq` varchar(15) NOT NULL,"
    "  `jackpot` varchar(10) NOT NULL,"
    "  `winners` int(10) NOT NULL,"
    "  `location` varchar(255) NOT NULL,"
    "  PRIMARY KEY (`draw_id`)"
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8;")


def selection_sort(arr):
    for i in range(len(arr)):
        minimum = i
        for j in range(i + 1, len(arr)):
            # Select the smallest value
            if arr[j] < arr[minimum]:
                minimum = j
        # Place it at the front of the
        # sorted end of the array
        arr[minimum], arr[i] = arr[i], arr[minimum]
    return arr

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


def create_database(cursor):
    try:
        cursor.execute(
            "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
    except mysql.connector.Error as err:
        print("Failed creating database: {}".format(err))
        exit(1)

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

    today = date.today()
    thisyear = today.strftime("%Y")
    print(thisyear)
    thismonth = today.strftime("%m")
    print(thismonth)


    for table_name in TABLES:
        table_description = TABLES[table_name]
        try:
            print("Creating table {}: ".format(table_name))
            cursor.execute(table_description)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("Table {} already exists.".format(table_name))
            else:
                print(err.msg)
        else:
            print("OK")

    query = ("SELECT draw_id FROM MassCashTbl WHERE draw_id=1")

    cursor.execute(query)

    print("Row count: %d" %(cursor.rowcount))

    if cursor.rowcount <= 0:
        ayear = '1991'
        amonth = '01'
        thismonth = '12'
    else:
        ayear = thisyear
        amonth = thismonth

    add_draw = ("INSERT IGNORE INTO MassCashTbl "
               "(draw_id, draw_date, draw_date_name, win1, win2, win3, win4, win5, ordseq, jackpot, winners, location)" 
               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")


#    for year in range(1991,2018):
    for year in range(int(ayear),int(thisyear)+1):
        for month in range(int(amonth),int(thismonth)+1):
            drawdate=str(year)+str(month).zfill(2)
            url = "http://www.masslottery.com/data/json/search/lotterygames/12/"+drawdate+".json"
            print(url)

            req = Request(url)
            try:
                response = urlopen(req)
            except HTTPError as e:
            # do something
                print('Error code: ', e.code)
            except URLError as e:
            # do something
                print('Reason: ', e.reason)
            else:
                data = json.loads(response.read())
                for element in data['draws']:
                    draw_id = element['draw_id']
                    draw_date = element['draw_date']
                    draw_date_name = element['draw_date_name']
                    #winning_num = element['winning_num'].replace('-',';')))
                    winning_num = element['winning_num']
                    print(winning_num)
                    wnum = winning_num.split('-')
                    wnum2 = wnum.copy()
                    wnum2 = list(map(int, wnum2))
                    res = selection_sort(wnum2)
                    res = list(map(str,res))
                    ordseq = '-'.join(res)
                    jackpot = element['jackpot']
                    winners = element['winners']
                    location = element['location']
                    print("%s;%s;%s;%s-%s-%s-%s-%s;%s,%s;%s;%s"%(draw_id, draw_date, draw_date_name, wnum[0], wnum[1], wnum[2], wnum[3], wnum[4], ordseq, jackpot, winners, location))
                    data_draw = (draw_id, draw_date, draw_date_name, wnum[0], wnum[1], wnum[2], wnum[3], wnum[4], ordseq, jackpot, winners, location)
                    cursor.execute(add_draw, data_draw)

    conn.commit()
    cursor.close()
    disconnect()


