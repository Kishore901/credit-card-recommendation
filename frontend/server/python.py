import re
import sys
import tabula
import pandas as pd
import numpy as np
import os

# print(sys.argv[1])
# print("pandas working")

pd.set_option('display.max_colwidth', None)
tabula.convert_into("base.pdf", "output.csv",
                    output_format="csv", pages='all')
df = pd.read_csv("output.csv")
dfs = pd.DataFrame(df, columns=["Txn Date", "Value Date", "Description",
                   "Ref No./ChequeNo.", "Debit", "Credit", "Balance"])

# Removing the row with item named Description in its row not header
dfs.drop(dfs.index[df["Description"] == "Description"], inplace=True)

# Retrieving only the not null Debit card section
dfs = dfs[pd.notnull(dfs["Debit"])]

# Keeping only required data
data = dfs.drop(
    ['Credit', "Value Date", "Ref No./ChequeNo.", "Balance"], axis=1)

b = []


def splitz(x):
    if "by debit card-OTHPOS" in x:
        b = re.split(r'by debit card-OTHPOS[0-9]+[\s]*', x)
        return (b[1])
    elif "by debit card-OTHPG" in x:
        x = x.replace('\r', '')
        b = re.split(r'by debit card-OTHPG[\s]*[0-9]+[\s]*', x)
        print(b)
        return (b[1])
    elif "by debit card-SBIPG" in x:
        b = re.split(
            r'by debit card-SBIPG[\s][a-zA-Z]?[a-zA-Z]?[0-9]{10,12}', x)
        return (b[1])
    elif "TO TRANSFER" in x:
        if "UPI" in x:
            x = x.replace('\r', '')
            x = x.replace(' ', '')
            b = re.split(r'TOTRANSFER[^\s]UPI/DR/[0-9]+/([A-Za-z0-9.]+)/', x)
            print(b)
            return b[1]
    else:
        return (0)


data["Description"] = data["Description"].apply(splitz)
# data = data.iloc[:, 1:]
print(data.head(50))
data.to_json("extracted.json",orient="records")