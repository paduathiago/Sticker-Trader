import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import silhouette_samples, silhouette_score
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE
import seaborn as sns
import pickle

dados = pd.read_csv('C:/Users/pedro/Downloads/test1 - Respostas ao formulário 1.csv')

colunas_ordinais = ['De 1 a 5 o quanto que você gosta de futebol? (5 para muito, 1 para pouco)',
                   'De 1 a 5 o quanto você se empenha para completar o álbum? ',
                   'De 1 a 5 o quanto você gosta de jogar futebol?']

colunas_nominais = ['Em que região você mora?',
                    'Você torce para algum time de futebol?',
                   'Qual seu modo preferido de assistir a um jogo de futebol?']

colunas_numericas = ['Quantos anos você tem?',
                     'Quantos jogos você costuma assistir por mês?',
                     'Quantos álbums da copa do mundo você já completou?']

cat_pipeline = Pipeline([
    ('one_hot', OneHotEncoder(handle_unknown='ignore', sparse=False))
])

num_pipeline = Pipeline([
    ('std_scaler', StandardScaler())
])

full_pipeline = ColumnTransformer([
    ('num', num_pipeline, colunas_numericas),
    ('cat', cat_pipeline, colunas_ordinais+colunas_nominais)
])

X_train = dados.copy()
X_train.drop(columns=['Seu e-mail?', 'Carimbo de data/hora'], axis=1, inplace=True)

X_train_prepared = full_pipeline.fit_transform(X_train)

silhoute = []
silhoutemais = []

for clusters in range(2,10):
    km = KMeans(n_clusters = clusters, init='random', max_iter=300,random_state=42)
    km.fit(X_train_prepared)
    labels = km.labels_
    silh = silhouette_score(X_train_prepared, labels)
    silhoute.append(silh)
    
for clusters in range(2,10):
    kmm = KMeans(n_clusters = clusters, init ='k-means++', max_iter=300,random_state=42)
    kmm.fit(X_train_prepared)
    labelsm = kmm.labels_
    silhm = silhouette_score(X_train_prepared, labelsm)
    silhoutemais.append(silhm)
    
model = TSNE(n_components=2, random_state=42, perplexity=50)
principal_comp = model.fit_transform(X_train_prepared)
tsne_dataframe = pd.DataFrame(data = principal_comp,columns = ['comp_1','comp_2'])

km = KMeans(n_clusters = 6, init ='random', max_iter=300,random_state=42)
km.fit(X_train_prepared)
labels = km.labels_
tsne_dataframe['clusters'] = labels
X_train['clusters'] = labels
dados['clusters'] = labels

sns.scatterplot(x='comp_1', y='comp_2', hue='clusters', data=tsne_dataframe, palette='viridis')

filename = 'finalized_model.sav'
pickle.dump(km, open(filename, 'wb'))
loaded_model = pickle.load(open(filename, 'rb'))


def recomendando_amigos(usuario):
    usuario_prepared = full_pipeline.transform(usuario)
    y = loaded_model.predict(usuario_prepared)[0]
    amigos = dados.loc[dados['clusters']==y].sample(n=3)
    print('AMIGOS RECOMENDADOS: ')
    return amigos

teste = X_train.sample(n=1)

recomendando_amigos(teste)

