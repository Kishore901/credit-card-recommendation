import numpy as np
import pandas as pd
import datetime as dt

data = pd.read_csv("list.csv", encoding = "unicode_escape")

data['Txn Date'] = pd.to_datetime(data['Txn Date']) #to convert data from string to date format

data["Description"]=data['Description'].apply(lambda x:x.lower())

df1=data["Description"].value_counts()

data=data.drop(["Description"],axis=1)

Latest_Date = dt.datetime(2022,6,18)

data["Debit"]=data["Debit"].replace(",","",regex=True)
data["Debit"] = data["Debit"].astype(float)

RFMScores = data.groupby('category').agg({'Txn Date': lambda x: (Latest_Date - x.max()).days, 'category': lambda x: len(x), 'Debit':lambda x: x.sum()})

RFMScores["Txn Date"] = RFMScores["Txn Date"].astype(int)

RFMScores.rename(columns = {"Txn Date":"Recency","category":"Frequency","Debit":"Monetary"},inplace=True)

RFMScores.reset_index()

quantiles = RFMScores.quantile(q=[0.25,0.5,0.75])
quantiles = quantiles.to_dict()

def RScoring(x,p,d):
    if x <= d[p][0.25]:
        return 1
    elif x <= d[p][0.50]:
        return 2
    elif x <= d[p][0.75]: 
        return 3
    else:
        return 4
    
def FnMScoring(x,p,d):
    if x <= d[p][0.25]:
        return 4
    elif x <= d[p][0.50]:
        return 3
    elif x <= d[p][0.75]: 
        return 2
    else:
        return 1

RFMScores['R'] = RFMScores['Recency'].apply(RScoring, args=('Recency',quantiles,))
RFMScores['F'] = RFMScores['Frequency'].apply(FnMScoring, args=('Frequency',quantiles,))
RFMScores['M'] = RFMScores['Monetary'].apply(FnMScoring, args=('Monetary',quantiles,))

RFMScores['RFMGroup'] = RFMScores.R.map(str) + RFMScores.F.map(str) + RFMScores.M.map(str)

#Calculate and Add RFMScore value column showing total sum of RFMGroup values
RFMScores['RFMScore'] = RFMScores[['R', 'F', 'M']].sum(axis = 1)

RFMSorted=RFMScores.sort_values(by=["RFMGroup"])

RFMSorted = RFMSorted.head(2)
RFM=list(RFMSorted.index)

df2=df1.head(5)

df2=list(df2.index)
mylist=RFM+df2

for item in mylist:
    print(item)

