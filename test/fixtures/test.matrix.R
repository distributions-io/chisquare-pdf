options( digits = 16 );
library( jsonlite );

df = 1
x = 0:24
y = dchisq( x, df )

cat( y, sep = ",\n" )

data = list(
	df = df,
	data = x,
	expected = y
)


write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/matrix.json" )
