import csv
import numpy as np
import matplotlib
matplotlib.use('Qt4Agg')
import matplotlib.pyplot as plt

def dataset(path, filter_field=None, filter_value=None):
    with open(path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        if filter_field:
            for row in filter(lambda row:
                    row[filter_field] == filter_value, reader):
                yield row
        else:
            for row in reader:
                yield row

def main_map(path):
    print "main_map?"
    data = [(row["Year"], float(row["Average income per tax unit"]))
            for row in dataset(path, "Country", "United States")]

    print data
    width = 0.35
    ind   = np.arange(len(data))
    fig   = plt.figure()
    ax    = plt.subplot(111)
    ax.bar(ind, list(d[1] for d in data))
    ax.set_xticks(np.arange(0, len(data), 4))
    ax.set_xticklabels(list(d[0] for d in data)[0::4], rotation=45)
    ax.set_ylabel("Income in USD")
    plt.title("U.S. Average Income 1913-2008")

    plt.show()

if __name__ == "__main__":
    main_map("./data/data.csv")

